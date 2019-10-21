import itertools
from functools import reduce
from typing import Set, List, Mapping
from utils import NumType


def get_divisors(num: int) -> Set[int]:
    result = set()
    if num < 2:
        return result
    result.add(1)
    for i in range(2, int(num ** 0.5) + 1):
        div = num / i
        if div % 1 == 0:
            result.add(i)
            result.add(int(div))
    return result


def get_number_type(num: int) -> NumType:
    divisors = get_divisors(num)
    divisors_sum = sum(divisors)
    if divisors_sum < num:
        return NumType.DEFICIENT
    elif divisors_sum > num:
        return NumType.ABUNDANT
    return NumType.PERFECT


def get_number_type_bulk(num_list: List[int]) -> Mapping[int, NumType]:
    return {num: get_number_type(num) for num in num_list}
