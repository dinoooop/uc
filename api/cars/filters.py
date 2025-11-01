from django.db.models import Q

def apply_filters(queryset, params):
    """Apply search, year, and price filters to the queryset."""

    # Search filter
    search_query = params.get('search', '')
    if search_query:
        queryset = queryset.filter(
            Q(name__icontains=search_query) |
            Q(brand__icontains=search_query)
        )

    # min max filter
    queryset = apply_min_max('year', queryset, params)
    queryset = apply_min_max('price', queryset, params)

    return queryset

def apply_min_max(field: str, queryset, params):
    """
    Filters queryset by min/max range for a given field name.
    Example: apply_min_max(cars, 'price', request.query_params)
    """
    min_val = params.get(f"{field}_min", '')
    max_val = params.get(f"{field}_max", '')

    filter_args = {}

    if min_val and max_val:
        filter_args[f"{field}__gte"] = min_val
        filter_args[f"{field}__lte"] = max_val
    elif min_val:
        filter_args[f"{field}__gte"] = min_val
    elif max_val:
        filter_args[f"{field}__lte"] = max_val

    if filter_args:
        queryset = queryset.filter(**filter_args)

    return queryset
