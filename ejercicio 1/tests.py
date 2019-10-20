from main import get_divisors, get_number_type, get_number_type_bulk, NumType, is_prime, get_primes_until


def get_divisors_assertion(num, expected_divisors):
    result = get_divisors(num)
    assert(expected_divisors == result), "expected divisors are %s but we got %s" % (
        expected_divisors, result)


def get_num_type_assertion(num, expected_num_type):
    result = get_number_type(num)
    assert(expected_num_type == result), "expected num type is %s but we got %s" % (
        expected_num_type, result)


def get_num_type_bulk_assertion(num_list, expected_mapping):
    result = get_number_type_bulk(num_list)
    for num in result:
        assert(expected_mapping[num] == result[num]), "expected num type is %s but we got %s" % (
            expected_mapping[num], result[num])


def test_get_divisors():
    get_divisors_assertion(6, set([1, 2, 3]))
    get_divisors_assertion(15, set([1, 3, 5]))
    get_divisors_assertion(32, set([1, 2, 4, 8, 16]))
    get_divisors_assertion(36, set([1, 2, 3, 4, 6, 9, 12, 18]))
    get_divisors_assertion(77, set([1, 7, 11]))
    print("success in get_divisors tests")


def test_get_num_type():
    get_num_type_assertion(6, NumType.PERFECT)
    get_num_type_assertion(15, NumType.DEFICIENT)
    get_num_type_assertion(32, NumType.DEFICIENT)
    get_num_type_assertion(36, NumType.ABUNDANT)
    get_num_type_assertion(77, NumType.DEFICIENT)
    print("success in get_num_type tests")


def test_get_num_type_bulk():
    get_num_type_bulk_assertion(
        [6, 15, 32, 36, 77],
        {
            6: NumType.PERFECT,
            15: NumType.DEFICIENT,
            32: NumType.DEFICIENT,
            36: NumType.ABUNDANT,
            77: NumType.DEFICIENT
        })
    print("success in get_num_type_bulk test")


def test_is_prime():
    assert(is_prime(3)), "wrong"
    assert(is_prime(5)), "wrong"
    assert(not is_prime(20)), "wrong"
    assert(not is_prime(1)), "wrong"
    print("success in is_prime")


def test_get_primes_until():
    assert(get_primes_until(3) == set([2, 3])), "wrong"
    assert(get_primes_until(5) == set([2, 3, 5])), "wrong"
    assert(get_primes_until(13) == set([2, 3, 5, 7, 11, 13])), "wrong"
    print("success in get_primes_until")


test_get_divisors()
test_get_num_type()
test_get_num_type_bulk()
test_is_prime()
test_get_primes_until()
