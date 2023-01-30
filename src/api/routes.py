"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Usuario, Candidato, Provincia, PuestoTrabajo, Empresa, Tipo_Empleo
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

import cloudinary
import cloudinary.uploader
import cloudinary.api

cloudinary.config(
  cloud_name = "dzpvz1nag",
  api_key = "596557131587953",
  api_secret = "2KrkTL_OSXyE6llrx1UKopLFOHs",
  secure = True
)

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

    provincia = Provincia.query.first()
    if provincia is None:
        return jsonify({"msg": "Provincias no cargadas", "data": None}), 400

    tipo_empleo = Tipo_Empleo.query.first()
    if tipo_empleo is None:
        return jsonify({"msg": "tipo_empleo no cargadas", "data": None}), 400


    puesto_trabajo = PuestoTrabajo.query.first()
    if puesto_trabajo is None:
        return jsonify({"msg": "puesto_trabajo no cargadas", "data": None}), 400


    if user.candidato: 
        candidato = Candidato(
            avatar = 'https://res.cloudinary.com/dzpvz1nag/image/upload/v1673638486/image_1_zapzbe.png',
            nombre = '',
            primer_apellido = '',
            segundo_apellido = '',
            puesto_trabajo = puesto_trabajo.id, # ojo
            telefono = 0,
            experiencia = '',
            cv = '',
            carta_presen = '',
            tipo_emp = tipo_empleo.id, #ojo
            provincia = provincia.id, 
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

@api.route('/provincias', methods=['GET'])
def get_provincias():
    provincias = Provincia.query.all()
    data = [provincia.serialize() for provincia in provincias]
    return jsonify({"msg": "", "data": data})

@api.route('/tiposEmpleo', methods=['GET'])
def get_tiposEmpleo():
    empleos = Tipo_Empleo.query.all()
    data = [empleo.serialize() for empleo in empleos]
    return jsonify({"msg": "", "data": data})

# https://3001-4geeksacade-reactflaskh-oxcbm6rsuhk.ws-eu84.gitpod.io/api/provincias

# https://3001-4geeksacade-reactflaskh-oxcbm6rsuhk.ws-eu84.gitpod.io/api/provincias

# https://3001-4geeksacade-reactflaskh-oxcbm6rsuhk.ws-eu84.gitpod.io/api/provincias

@api.route('/puestosTrabajo', methods=['GET'])
def get_puestosTrabajo():
    puestosTrabajo = PuestoTrabajo.query.all()
    data = [puestoTrabajo.serialize() for puestoTrabajo in puestosTrabajo]
    return jsonify({"msg": "", "data": data})


@api.route('/edit_candidato/<int:id>', methods=['PUT'])
# @api.route('/prueba', methods=['GET'])
# @jwt_required()
def editar_candidato(id):
    # data = get_jwt_identity()
    ## ---
    # return jsonify({"msg": ">>>>", "data": "candidato.serialize()"})
    avatar_file = request.files.get('avatar')
    print('avatar_file: ', avatar_file)
    url_avatar = ''
    if avatar_file:
        data = cloudinary.uploader.upload(avatar_file)
        url_avatar = data["secure_url"]


    user = Usuario.query.filter_by(id=id).first()
    if user is None:
        return jsonify({"msg":"User no encontrado", "data": None}), 404

    print(user)
    candidato = Candidato.query.filter_by(usuario_id=user.id).first()
    if candidato is None:
        return jsonify({"msg":"Candidato no encontrado", "data": None}), 404

    # print(candidato)
    nombre = request.form.get('nombre')
    primer_apellido = request.form.get('primer_apellido')
    segundo_apellido = request.form.get('segundo_apellido')
    puesto_trabajo = request.form.get('puesto_trabajo')
    telefono = request.form.get('telefono')
    experiencia = request.form.get('experiencia')
    carta_presen = request.form.get('carta_presen')
    tipo_emp = request.form.get('tipo_emp')
    provincia = request.form.get('provincia')
    # visible = body.get('visible')

    # candidato.avatar = avatar if avatar != None and avatar != "" else  candidato.avatar
    candidato.avatar = url_avatar if url_avatar != None and url_avatar != "" else  candidato.avatar
    candidato.nombre = nombre if nombre != None and nombre != "" else  candidato.nombre
    candidato.primer_apellido = primer_apellido if primer_apellido != None and primer_apellido != "" else  candidato.primer_apellido
    candidato.segundo_apellido = segundo_apellido if segundo_apellido != None and segundo_apellido != "" else  candidato.segundo_apellido
    candidato.puesto_trabajo = puesto_trabajo if puesto_trabajo != None and puesto_trabajo != "" else  candidato.puesto_trabajo
    candidato.telefono = telefono if telefono != None and telefono != "" else  candidato.telefono
    candidato.experiencia = experiencia if experiencia != None and experiencia != "" else  candidato.experiencia
    candidato.cv = url_cv if url_cv != None and url_cv != "" else  candidato.cv
    candidato.carta_presen = carta_presen if carta_presen != None and carta_presen != "" else  candidato.carta_presen
    candidato.tipo_emp = tipo_emp if tipo_emp != None and tipo_emp != "" else  candidato.tipo_emp
    candidato.provincia = provincia if provincia != None and provincia != "" else  candidato.provincia

    

    # # if visible:
    # #   user.visible = visible

    # # GUARDO
    db.session.commit()
    return jsonify({"msg": ">>>>", "data": candidato.serialize()})
    
    # return jsonify({"msg": "", "data": candidato.serialize()})

def uploadAvatar():
    avatar = request.files.get['avatar']
    if avatar:
        data = cloudinary.uploader.upload(avatar)
        url_avatar = data["secure-url"]
        return jsonify(data), 201
    return jsonify({"msg":"Error al subir tu imagen"})

    print(avatar)



@api.route('/edit_empresa/<int:id>/', methods=['PUT'])
# @jwt_required()
def editar_empresa(id):
    # data = get_jwt_identity()
    # --- CLOUDINARY
    avatar_file = request.files.get('avatar')
    print('avatar_file: ', avatar_file)
    url_avatar = ''
    if avatar_file:
        data = cloudinary.uploader.upload(avatar_file)
        url_avatar = data["secure_url"]
    # ---
    # --- Filtrado entre candidato y empresa
    user = Usuario.query.filter_by(id=id).first()
    if user is None:
        return jsonify({"msg":"User no encontrado", "data": None}), 404

    print(user)
    empresa = Empresa.query.filter_by(usuario_id=user.id).first()
    if empresa is None:
        return jsonify({"msg":"Empresa no encontrada", "data": None}), 404
    # ---
    # --- Recepcion de datos de empresa
    nombre_emp = request.form.get('nombre_emp')
    ubicacion = request.form.get('ubicacion') #UBICACION Y PROVINCIA SON LO MISMO
    tipo_trab = request.form.get('tipo_trab') #TIPO DE TRABAJO Y TIPO DE EMPLEO SON LO MISMO
    telefono = request.form.get('telefono')
    numero_trab = request.form.get('numero_trab')
    sede = request.form.get('sede')
    sector = request.form.get('sector') #Sector en el que trabaja la empresa
    indentificacion_fiscal = request.form.get('identificacion_fiscal')
    descripcion = request.form.get('descripcion')

    empresa.avatar = url_avatar if url_avatar != None and url_avatar != "" else  empresa.avatar
    empresa.nombre_emp = nombre_emp if nombre_emp != None and nombre_emp != "" else  empresa.nombre_emp
    # empresa.tipo_emp = tipo_emp if tipo_emp != None and tipo_emp != "" else  empresa.tipo_emp
    # empresa.provincia = provincia if provincia != None and provincia != "" else  empresa.provincia
    empresa.sector = sector if sector != None and sector != "" else  empresa.sector
    empresa.telefono = telefono if telefono != None and telefono != "" else  empresa.telefono
    empresa.indentificacion_fiscal = indentificacion_fiscal if indentificacion_fiscal != None and indentificacion_fiscal != "" else  empresa.indentificacion_fiscal
    # ----
    db.session.commit()
    return jsonify({"msg": ">>>>", "data": empresa.serialize()})

def uploadAvatar():
    avatar = request.files.get['avatar']
    if avatar:
        data = cloudinary.uploader.upload(avatar)
        url_avatar = data["secure-url"]
        return jsonify(data), 201
    return jsonify({"msg":"Error al subir tu imagen"})

    print(avatar)

@api.route('/candidato/<int:id>/', methods=['GET'])
# @jwt_required()
def obtener_candidato(id):
    user = Usuario.query.filter_by(id=id).first()
    if user is None:
        return jsonify({"msg":"User no encontrado", "data": None}), 404

    candidato = Candidato.query.filter_by(usuario_id=user.id).first()
    if candidato is None:
        return jsonify({"msg":"Candidato no encontrado", "data": None}), 404

    return jsonify({"msg":"", "data": candidato.serialize()}), 200


@api.route('/lista_candidatos', methods=['GET'])
# @jwt_required()
def obtener_candidatos():
    candidatos = Candidato.query.all()
    data = [candidato.serialize() for candidato in candidatos]
    return jsonify({"msg": "", "data": data}), 200


@api.route('/usuario/<int:id>', methods=['DELETE'])
def eliminar_usuario(id):
    user = Usuario.query.filter_by(id=id).first()
    print(user)

    if user is None:
        return jsonify({"msg":"User no encontrado", "data": None}), 404

    if user.candidato:
        candidato = Candidato.query.filter_by(usuario_id=user.id).first()
        if candidato is None:
            return jsonify({"msg":"candidato no encontrado", "data": None}), 404
        
        db.session.delete(candidato)
        # db.session.commit()
    else:
        empresa = Empresa.query.filter_by(usuario_id=user.id).first()
        if empresa is None:
            return jsonify({"msg":"empresa no encontrado", "data": None}), 404
        
        db.session.delete(empresa)

    db.session.delete(user)
    db.session.commit()
    return jsonify({"msg":"Perfil eliminado", "data": None}), 200


@api.route('/edit_visible_candidato/<int:id>', methods=['PUT'])
# @api.route('/prueba', methods=['GET'])
# @jwt_required()
def edit_visible_candidato(id):
    # data = get_jwt_identity()
    ## ---
    # return jsonify({"msg": ">>>>", "data": "candidato.serialize()"})
    user = Usuario.query.filter_by(id=id).first()
    if user is None:
        return jsonify({"msg":"User no encontrado", "data": None}), 404

    candidato = Candidato.query.filter_by(usuario_id=user.id).first()
    if candidato is None:
        return jsonify({"msg":"Candidato no encontrado", "data": None}), 404

    body = request.get_json()
    candidato.es_visible = body.get('es_visible')
    db.session.commit()
    return jsonify({"msg": ">>>>", "data": candidato.serialize()})
    














# @api.route('/candidato/<int:id>/', methods=['PUT'])
# @jwt_required()
def obtener_empresa(id):
    user = Usuario.query.filter_by(id=id).first()
    if user is None:
        return jsonify({"msg":"User no encontrado", "data": None}), 404

    emrpesa = Empresa.query.filter_by(usuario_id=user.id).first()
    if emrpesa is None:
        return jsonify({"msg":"Empresa no encontrada", "data": None}), 404

    return jsonify({"msg":"", "data": emrpesa.serialize()}), 200

# @api.route('/private', methods=['GET'])
# @jwt_required()
# def private():
#     data = get_jwt_identity()
#     print(data)
#     return jsonify(data)