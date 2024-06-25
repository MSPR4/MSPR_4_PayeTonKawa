#!/usr/bin/env python3

import os
from api.database.connection_db import app
from api.products.products import products_root

app.register_blueprint(products_root, url_prefix='/products')

if __name__ == '__main__':
    app.debug = True
    app.run(host=os.getenv("HOST"), port=os.getenv("PORT"))