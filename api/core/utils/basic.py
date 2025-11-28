def special_floor(n: int) -> int:
    breakpoints = [
        0,
        100,
        1000,
        5000,
        10000,
        50000,
        100000,
        500000,
        1000000,
        5000000,
        10000000,
    ]

    # If n is below the smallest breakpoint return 0
    if n < breakpoints[0]:
        return 0

    # Iterate through breakpoints and find the largest one <= n
    floor_value = 0
    for bp in breakpoints:
        if n >= bp:
            floor_value = bp
        else:
            break

    return floor_value


def special_ceil(n: int) -> int:
    breakpoints = [
        0,
        100,
        1000,
        5000,
        10000,
        50000,
        100000,
        500000,
        1000000,
        5000000,
        10000000,
    ]

    # If n is smaller than or equal to the first breakpoint, return the first
    if n <= breakpoints[0]:
        return breakpoints[0]

    # Loop to find next breakpoint >= n
    for i, bp in enumerate(breakpoints):
        if n == bp:
            return bp  # exact match → return itself
        if n < bp:
            return bp  # first bp greater than n

    # If n is above all breakpoints → return last breakpoint
    return breakpoints[-1]

