

from functools import wraps
from flask_login import login_required, current_user as logged_in_user

def has_role(ROLE):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            current_user_roles = list(map(lambda n: n.name, logged_in_user.roles))
            if ROLE in current_user_roles:
                return fn(*args, **kwargs)
            else:
                return {"message": "You are not allowed to perform this operation"}, 405
        return decorator
    return wrapper
    

def has_any_role(*ROLES):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            current_user_roles = list(map(lambda n: n.name, logged_in_user.roles))
            if any(role in ROLES for role in current_user_roles):
                return fn(*args, **kwargs)
            else:
                return {"message": "You are not allowed to perform this operation"}, 405
        return decorator
    return 
    
