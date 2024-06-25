from .connection_db import db, app

class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    stock_quantity = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(100))
    date_added = db.Column(db.DateTime, default=db.func.current_timestamp())
    is_available = db.Column(db.Boolean, default=True)

    def __repr__(self):
        return f'<Product {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': str(self.price),
            'stock_quantity': self.stock_quantity,
            'category': self.category,
            'date_added': self.date_added.isoformat() if self.date_added else None,
            'is_available': self.is_available
        }

    def raise_incorrect_dict(self, new_data : dict) -> None:
        key_needed = {
            "name" : str,
            "description": str,
            "price" : int,
            "stock_quantity" : int,
            "is_available": bool
        }
        for key in new_data:
            if key in key_needed:
                if type(new_data[key]) != key_needed[key]:
                    raise TypeError(f"Invalid type [{key}] not an {key_needed[key]}")
                else:
                    key_needed.pop(key)
        if key_needed:
            missing_value = ", ".join([key_missing for key_missing in key_needed])
            raise TypeError(f"Invalid key_needed not fulfil miss [{missing_value}]")

    @classmethod
    def create(self, new_data : dict):
        self.raise_incorrect_dict(new_data)
        new_product = self(**new_data)
        db.session.add(new_product)
        db.session.commit()
        return new_product


# Créer les tables de la base de données
with app.app_context():
    db.create_all()