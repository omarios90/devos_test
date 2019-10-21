import itertools
from functools import reduce
from typing import Set, List, Mapping
from utils import NumType


def get_primes_divisors(num: int) -> List[int]:
    prime_divisors = list()
    inner_num = num

    while inner_num % 2 == 0:
        prime_divisors.append(2)
        inner_num = int(inner_num / 2)

    for i in range(3, inner_num + 1, 2):
        while inner_num % i == 0:
            prime_divisors.append(i)
            inner_num = int(inner_num / i)
    return prime_divisors


def get_divisors2(num: int) -> Set[int]:
    prime_divisors = get_primes_divisors(num)
    result = set([1])
    for i in range(0, len(prime_divisors) + 1):
        for subset in itertools.combinations(prime_divisors, i): # no es óptimo
            if subset:
                result.add(reduce(lambda x, y: x*y, subset))
    result.remove(num)
    return result


def get_number_type2(num: int) -> NumType:
    primes_divisors = get_divisors2(num)
    divisors_sum = sum(primes_divisors)
    if divisors_sum < num:
        return NumType.DEFICIENT
    elif divisors_sum > num:
        return NumType.ABUNDANT
    return NumType.PERFECT


def get_number_type_bulk2(num_list: List[int]) -> Mapping[int, NumType]:
    return {num: get_number_type2(num) for num in num_list if num}
