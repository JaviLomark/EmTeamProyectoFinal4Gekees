"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

app = Flask(__name__)
bcrypt = Bcrypt(app)

api = Blueprint('api', __name__)


# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200

@app.route('/')
def sitemap():
    return generate_sitemap(app)

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()

    email = body.get('email')
    password = body.get('password')
    # Validad email y password != None

    hash = bcrypt.generate_password_hash(password)
    print(hash)

    user = User(
        email = email,
        password = hash.decode('utf-8'),
        is_active = True,
    )

    db.session.add(user)
    db.session.commit()

    return jsonify(user.serialize())

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()

    email = body.get('email')
    password = body.get('password')
    # Validad email y password != None

    users = User.query.filter_by(email=email).all()

    if(len(users) == 0):
        return jsonify(msg="El usuario con email: " + email + " no existe")

    user = users[0]
    hash = user.password
    isValid = bcrypt.check_password_hash(hash,password)

    if not isValid:
        return jsonify(msg="Clave incorrecta")

    token = create_access_token(identity=user.serialize())
    return jsonify(token=token)

@app.route('/candidatos', methods=['GET'])
def lista_candidatos():
    candidatos = Usuario.query.all()
    lista_candidatos = list(map(lambda obj : obj.serialize(),candidatos))
    response_body = {
        
        "success": True,
        "results": lista_candidatos()
    }

    return jsonify(response_body.serialize()), 200

@app.route('/candidatos/<int:usuario_id>', methods=['GET'])
def show_usuario(usuario_id):
    usuario.Id = usuario.query.get(usuario_id)
    print(usuario.Id)
    return jsonify(usuarioId.serialize()), 200