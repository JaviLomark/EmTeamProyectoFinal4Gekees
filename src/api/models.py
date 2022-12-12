from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

class Usuario(db.Model):
    __tablename__ = "Usuario"
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

class Tipo_Empleo(db.Model):
    __tablename__ = "Tipo_Empleo"

    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(120), unique=False, nullable=False)

class Provincia(db.Model):
    __tablename__ = "Provincia"

    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(120), unique=False, nullable=False)

class Candidato(db.Model):
    __tablename__ = "Candidato"

    id = db.Column(db.Integer, primary_key=True)
    avatar = db.Column(db.String(120), unique=False, nullable=False)
    nombre = db.Column(db.String(120), unique=False, nullable=False)
    primer_apellido = db.Column(db.String(120), unique=False, nullable=False)
    segundo_apellido = db.Column(db.String(120), unique=False, nullable=False)
    puesto_trab = db.Column(db.String(120), unique=False, nullable=False)
    telefono = db.Column(db.Integer, unique=False, nullable=False)
    experiencia = db.Column(db.String(120), unique=False, nullable=False)
    cv = db.Column(db.String(120), unique=False, nullable=False)
    carta_presen = db.Column(db.String(120), unique=False, nullable=False)
    tipo_emp = db.Column(db.Integer, db.ForeignKey('Tipo_Empleo.id'), unique=False, nullable=False)
    empleos = db.relationship(Tipo_Empleo)
    provincia = db.Column(db.Integer, db.ForeignKey('Provincia.id'), unique=False, nullable=False)
    provincias = db.relationship(Provincia)
    usuario = db.Column(db.Integer, db.ForeignKey('Usuario.id'), unique=False, nullable=False)
    usuarios = db.relationship(Usuario)
    es_visible = db.Column(db.Boolean(), unique=False, nullable=False)

class Sector(db.Model):
    __tablename__ = "Sector"

    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(120), unique=False, nullable=False)

class Empresa(db.Model):
    __tablename__ = "Empresa"

    id = db.Column(db.Integer, primary_key=True)
    avatar = db.Column(db.String(120), unique=False, nullable=False)
    nombre_emp = db.Column(db.String(120), unique=False, nullable=False)
    numero_trab = db.Column(db.Integer, unique=False, nullable=False)
    ubicacion = db.Column(db.String(120), unique=False, nullable=False)
    tipo_trab = db.Column(db.Integer, db.ForeignKey('Tipo_Empleo.id'), unique=False, nullable=False)
    trabajos = db.relationship(Tipo_Empleo)
    sede = db.Column(db.String(120), unique=False, nullable=False)
    telefono = db.Column(db.Integer, unique=False, nullable=False)
    sector = db.Column(db.Integer, db.ForeignKey('Sector.id'), unique=False, nullable=False)
    sectores = db.relationship(Sector)
    indentificacion_fiscal = db.Column(db.String(120), unique=False, nullable=False)
    descripcion = db.Column(db.String(120), unique=False, nullable=False)
    usuario = db.Column(db.Integer, db.ForeignKey('Usuario.id'), unique=False, nullable=False)
    usuarios = db.relationship(Usuario)

class Me_Gusta(db.Model):
    __tablename__ = "Me_gusta"

    id = db.Column(db.Integer, primary_key=True)
    candidato_id = db.Column(db.Integer, db.ForeignKey('Candidato.id'), unique=False, nullable=False)
    candidatos = db.relationship(Candidato)
    empresa_id = db.Column(db.Integer, db.ForeignKey('Empresa.id'), unique=False, nullable=False)
    empresas = db.relationship(Empresa)