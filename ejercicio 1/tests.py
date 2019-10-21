import time
from solution import get_divisors, get_number_type, get_number_type_bulk
from solution_primes import get_divisors2, get_number_type2, get_number_type_bulk2
from utils import NumType


def get_divisors_assertion(fn, num, expected_divisors):
    result = fn(num)
    assert(expected_divisors == result), "num %s [fn: %s]: expected divisors are %s but we got %s" % (
        num, fn.__name__, expected_divisors, result)


def get_num_type_assertion(fn, num, expected_num_type):
    result = fn(num)
    assert(expected_num_type == result), "num %s [fn: %s]: expected num type is %s but we got %s" % (
        num, fn.__name__, expected_num_type, result)


def get_num_type_bulk_assertion(fn, num_list, expected_mapping):
    result = fn(num_list)
    for num in result:
        assert(expected_mapping[num] == result[num]), "num %s [%s]: expected num type is %s but we got %s" % (
            num, fn.__name__, expected_mapping[num], result[num])


def test_get_divisors(fn):
    get_divisors_assertion(fn, 6, set([1, 2, 3]))
    get_divisors_assertion(fn, 15, set([1, 3, 5]))
    get_divisors_assertion(fn, 32, set([1, 2, 4, 8, 16]))
    get_divisors_assertion(fn, 36, set([1, 2, 3, 4, 6, 9, 12, 18]))
    get_divisors_assertion(fn, 77, set([1, 7, 11]))
    print("success in %s tests" % fn.__name__)


def test_get_num_type(fn):
    get_num_type_assertion(fn, 6, NumType.PERFECT)
    get_num_type_assertion(fn, 15, NumType.DEFICIENT)
    get_num_type_assertion(fn, 32, NumType.DEFICIENT)
    get_num_type_assertion(fn, 36, NumType.ABUNDANT)
    get_num_type_assertion(fn, 77, NumType.DEFICIENT)
    print("success in %s tests" % fn.__name__)


def test_get_num_type_bulk(fn):
    get_num_type_bulk_assertion(
        fn,
        [6, 15, 32, 36, 77],
        {
            6: NumType.PERFECT,
            15: NumType.DEFICIENT,
            32: NumType.DEFICIENT,
            36: NumType.ABUNDANT,
            77: NumType.DEFICIENT
        })
    print("success in %s tests" % fn.__name__)


test_get_divisors(get_divisors)
test_get_divisors(get_divisors2)
test_get_num_type(get_number_type)
test_get_num_type(get_number_type2)
test_get_num_type_bulk(get_number_type_bulk)
test_get_num_type_bulk(get_number_type_bulk2)


range_to_test = list(range(1, 10000))
start_time = time.time()
a = get_number_type_bulk2(range_to_test)
elapsed_time = time.time() - start_time
print("time elapsed: %s" % elapsed_time)
start_time = time.time()
b = get_number_type_bulk(range_to_test)
elapsed_time = time.time() - start_time
print("time elapsed: %s" % elapsed_time)
for key in a:
    if a[key] != b[key]:
        print(key, a[key], b[key])
