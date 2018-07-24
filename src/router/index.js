const router = req => {

    switch (true) {

        case /^(\/w+)/.test(req):
          console.log('post');
          return 'post';

        case /^(\/)!w+/.test(req):
        console.log('index');
        return 'index';

        default:
            return;
    }
}


