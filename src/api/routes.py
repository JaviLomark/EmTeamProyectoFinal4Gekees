"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Usuario, Candidato, Provincia, PuestoTrabajo, Empresa
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)
app = Flask(__name__)
bcrypt = Bcrypt(app)

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

    email = body.get("email")
    passwordNew = body.get("passwordNew")
    passwordRepeat = body.get("passwordRepeat")
    esCandidato = body.get('candidato')

    if email is None or passwordNew is None or passwordRepeat is None:
        return jsonify({"msg": "Por favor, rellena los campos", "data": None}), 400

    if len(passwordNew) < 6:
        return jsonify({"msg": "Formato de contraseña incorrecto, la contraseña debe tener 6 caracteres como mínimo", "data": None}), 400

    if passwordNew != passwordRepeat:
        return jsonify({"msg": "Las contraseñas no coinciden", "data": None}), 400

    usuarioLista = Usuario.query.filter_by(email = email).all()
    if (len(usuarioLista) > 0): 
        return jsonify({"msg": "Usuario ya registrado!", "data": None}), 400

    hash = bcrypt.generate_password_hash(passwordNew)
    print(hash)
    print("hash: " + str(hash))

    user = Usuario(
        email = email,
        password = hash.decode('utf-8'),
        candidato = esCandidato
    )

    db.session.add(user)
    db.session.commit()

    if user.candidato: 
        candidato = Candidato(
            avatar = '',
            nombre = '',
            primer_apellido = '',
            segundo_apellido = '',
            puesto_trabajo = 1, # ojo
            telefono = 0,
            experiencia = '',
            cv = '',
            carta_presen = '',
            tipo_emp = 1, #ojo
            provincia = 1, # provincia_id
            usuario_id = user.id,
            es_visible = True, # OJO
        )
        db.session.add(candidato)
        db.session.commit()
    else:
        empresa = Empresa(
            avatar = '',
            nombre_emp = '',
            numero_trab = 0,
            ubicacion = '',
            tipo_trab = 1, # ojo 
            sede = '',
            telefono = '',
            sector = 1, # ojo 
            indentificacion_fiscal = '',
            descripcion = '',
            usuario_id = user.id
        )
        db.session.add(empresa)
        db.session.commit()

    print(body)

    

    return jsonify({"msg": None, "data": user.serialize()}), 201

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")
    users = Usuario.query.filter_by(email=email).all()
    print(users)
    if (len(users) == 0):
        return jsonify({"msg": "El usuario con email: " + email + " no existe", "data": None}), 400
        
    user = users[0]
    # if user.candidato: 
    #     # el user es candidato
    #     candidatos = Candidato.query.filter_by(usuario_id=user.id)
    #     candidato = candidatos[0]
    #     candidato.avatar
    #     info["avatar"] = candidato.avatar
    # else:
    #     # el user NO es candidato
    #     empresas = Empresa.query.filter_by(usuario_id=user.id)
    #     empresa = empresas[0]
    #     empresa.avatar
    #     info["avatar"] = empresa.avatar

    hash = user.password
    isValid = bcrypt.check_password_hash(hash, password)
    if not isValid:
        return jsonify({"msg": "Clave incorrecta", "data": None}), 400
    # Solo si el usuario es candidato OJOOOOOOOO
    # candidatos = Candidato.query.filter_by(usuario_id=user.id).first()
    # candidato = candidatos[0]
    
    rol = "candidato" if user.candidato else "empresa" 
    token = create_access_token(
        identity={"rol": rol, "data": user.serialize()})
    return jsonify({"msg": None, "data": { "userId": user.id, "token": token, "rol": rol }})

@api.route('/usuario/<int:id>/', methods=['DELETE'])
def usuario(id):
   return jsonify({"msg":"Perfil eliminado", "data": None}), 201

@api.route('/provincias', methods=['GET'])
def get_provincias():

    provincias = Provincia.query.all()
    data = [provincia.serialize() for provincia in provincias]
    return jsonify(data)

@api.route('/puestosTrabajo', methods=['GET'])
def get_puestosTrabajo():

    puestosTrabajo = PuestoTrabajo.query.all()
    data = [puestoTrabajo.serialize() for puestoTrabajo in puestosTrabajo]
    return jsonify(data)

@api.route('/candidato/<int:id>/', methods=['POST'])
@jwt_required()
def editar_candidato(id):
    data = get_jwt_identity()
    body = request.get_json()
    nombre = body.get('nombre')
    primer_apellido = body.get('primer_apellido')
    segundo_apellido = body.get('segundo_apellido')
    puesto_trab = body.get('puesto_trab')
    telefono = body.get('telefono')
    experiencia = body.get('experiencia')
    cv = body.get('cv')
    carta_presen = body.get('carta_presen')
    tipo_emp = body.get('tipo_emp')
    provincia = body.get('provincia')

@api.route('/empresa/<int:id>/', methods=['POST'])
@jwt_required()
def editar_empresa(id):
    data = get_jwt_identity()
    body = request.get_json()
    nombreEmpresa = body.get('nombreEmpresa')
    NumeroTrabajadores = body.get('NumeroTrabajadores')
    ubicacion = body.get('ubicacion')
    tipo_emp = body.get('tipo_emp')
    telefono = body.get('telefono')
    sector = body.get('sector')
    indentificacion_fiscal = body.get('indentificacion_fiscal')
    descripcion = body.get('descripcion')





@api.route('/candidato/<int:id>/', methods=['GET'])
@jwt_required()
def obtener_candidato(id):
    
    users = User.query.filter_by(id=id)
    if len(users) == 0:
        return jsonify({"msg":"User no encontrado", "data": None}), 404

    user = users[0]
    candidatos = Candidato.query.filter_by(usuario_id=user.id)
    if len(candidatos) == 0:
        return jsonify({"msg":"Candidato no encontrado", "data": None}), 404
    candidato = candidatos[0]

    return jsonify({"msg":"Candidato no encontrado", "data": candidato}), 200

# @api.route('/candidato/<int:id>/', methods=['PUT'])
# @jwt_required()
# def actualizar_candidato(id):
#    return jsonify({"msg":"Error al actualizar", "data": None}), 200

# @api.route('/candidatos', methods=['GET'])
# @jwt_required()
# def listar_candidatos():
#     return jsonify({"msg":"No se encuentran ningun candidato", "data": None}), 200

# @api.route('/empresa/<int:id>/', methods=['GET'])
# @jwt_required()
# def editar_empresa(id):
#    return jsonify({"msg":"Empresa no encontrada", "data": None}), 200

# @api.route('/empresa/<int:id>/', methods=['PUT'])
# @jwt_required()
# def actualizar_empresa(id):
#     return jsonify({"msg":"Error al actualizar", "data": None}), 200



# @app.route('/candidatos', methods=['GET'])
# def lista_candidatos():
#     candidatos = Usuario.query.all()
#     lista_candidatos = list(map(lambda obj : obj.serialize(),candidatos))
#     response_body = {
        
#         "success": True,
#         "results": lista_candidatos()
#     }

#     return jsonify(response_body.serialize()), 200

# @app.route('/candidatos/<int:usuario_id>', methods=['GET'])
# def show_usuario(usuario_id):
#     usuario.Id = usuario.query.get(usuario_id)
#     print(usuario.Id)
#     return jsonify(usuarioId.serialize()), 200


# @app.route('/candidatos', methods=['GET'])
# def lista_candidatos():
#     candidatos = Usuario.query.all()
#     lista_candidatos = list(map(lambda obj : obj.serialize(),candidatos))
#     response_body = {
        
#         "success": True,
#         "results": lista_candidatos()
#     }

#     return jsonify(response_body.serialize()), 200

# @app.route('/candidatos/<int:usuario_id>', methods=['GET'])
# def show_usuario(usuario_id):
#     usuario.Id = usuario.query.get(usuario_id)
#     print(usuario.Id)
#     return jsonify(usuarioId.serialize()), 200

# @api.route('/private', methods=['GET'])
# @jwt_required()
# def private():
#     data = get_jwt_identity()
#     print(data)
#     return jsonify(data)