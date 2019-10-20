from enum import Enum
from typing import Set, List, Mapping


class NumType(Enum):
    PERFECT = 0
    ABUNDANT = 1
    DEFICIENT = 2


def get_divisors(num: int) -> Set[int]:
    result = set()
    result.add(1)
    for i in range(2, int(num ** 0.5) + 1):
        div = num / i
        if div % 1 == 0:
            result.add(i)
            result.add(int(div))
    return result


def get_primes_until(num: int) -> Set[int]:
    result = set()
    for i in range(2, num + 1):
        if is_prime(i):
            result.add(i)
    return result


def is_prime(num: int) -> bool:
    if num < 2:
        return False
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            return False
    return True


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
