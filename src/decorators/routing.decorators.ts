import { Container } from '../core/container';

let router = Container.get('router');

export function Get(...getArgs) {
    return function(target, name, descriptor) {
        if (Container.has('oauth')) {
            router.get(getArgs[0], Container.get('oauth').authorise(), (req, res) => descriptor.value(req, res));
            return;
        }

        router.get(getArgs[0], (req, res) => descriptor.value(req, res));
    }
}

export function Post(...getArgs) {
    return function(target, name, descriptor) {
        if (Container.has('oauth')) {
            router.post(getArgs[0], Container.get('oauth').authorise(), (req, res) => descriptor.value(req, res));
            return;
        }

        router.post(getArgs[0], (req, res) => descriptor.value(req, res));
    }
}

export function Put(...getArgs) {
    return function(target, name, descriptor) {
        if (Container.has('oauth')) {
            router.put(getArgs[0], Container.get('oauth').authorise(), (req, res) => descriptor.value(req, res));
            return;
        }

        router.put(getArgs[0], (req, res) => descriptor.value(req, res));
    }
}

export function Delete(...getArgs) {
    return function(target, name, descriptor) {
        if (Container.has('oauth')) {
            router.delete(getArgs[0], Container.get('oauth').authorise(), (req, res) => descriptor.value(req, res));
            return;
        }

        router.delete(getArgs[0], (req, res) => descriptor.value(req, res));
    }
}

export function WithRouter() {
    return function(target) {
        target.router = router;
    }
}
