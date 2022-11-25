from passlib.context import CryptContext

pwd_cxt = CryptContext(schemes=['bcrypt'], deprecated='auto')


def hash_pass(password: str):
    return pwd_cxt.hash(password)

def verify(hashed_password, input_password):
    return pwd_cxt.verify(input_password, hashed_password)