from enum import Enum


class NumType(Enum):
    PERFECT = 0
    ABUNDANT = 1
    DEFICIENT = 2


def get_divisors(num):
    result = set()
    result.add(1)
    for i in range(2, int(num ** 0.5) + 1):
        div = num / i
        if div % 1 == 0:
            result.add(i)
            result.add(int(div))
    return result


def get_number_type(num):
    divisors = get_divisors(num)
    divisors_sum = sum(divisors)
    if divisors_sum < num:
        return NumType.DEFICIENT
    elif divisors_sum > num:
        return NumType.ABUNDANT
    return NumType.PERFECT
