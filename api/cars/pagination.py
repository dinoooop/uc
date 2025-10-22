from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
import math

class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,  # total items
            'per_page': self.get_page_size(self.request),
            'total_pages': math.ceil(self.page.paginator.count / self.get_page_size(self.request)),
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data,
        })
