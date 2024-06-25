from flask import request, Blueprint,  jsonify
from flask_sqlalchemy import SQLAlchemy
from api.database.model import Product

products_root = Blueprint("products", __name__)
db = SQLAlchemy(products_root)

@products_root.route('/')
def get_products():
    products = Product.query.all()
    return {"products": [product.to_dict() for product in products]}

@products_root.route('/', methods=["POST"])
def post_products():
    try:
        return {**Product.create(request.json).to_dict(), **{"message": "successfully added"}}
    except TypeError as err:
        return jsonify({"message": err}), 400

def delete_product(product : Product) -> dict:
    value = product.to_dict
    value = {**value, **{"message": f"product ${product.id} successfully deleted"}}
    product.query.delete()
    return value

def get_product(product : Product) -> dict:
    return product.to_dict()

@products_root.route('/<id>', methods=['GET', 'POST', 'DELETE'])
def handle_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"message": "id dose not exist"}), 404
    endpoint_function = {
        "GET": get_product,
        "DELETE": delete_product
    }
    return endpoint_function[request.method](product)

