from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

class Candidato(db.Model):
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
    tipo_emp = db.Column(db.Integer(120), ForeignKey('Tipo_Empleo.id'), unique=False, nullable=False)
    provincia = db.Column(db.Integer, ForeignKey('Provincia.id'), unique=False, nullable=False)
    usuario = db.Column(db.Integer, ForeignKey('Usuario.id'), unique=False, nullable=False)
    es_visible = db.Column(db.Boolean(), unique=False, nullable=False)

class Tipo_Empleo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.string, unique=False, nullable=False)

class Provincia(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.string, unique=False, nullable=False)

class Empresa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    avatar = db.Column(db.String(120), unique=False, nullable=False)
    nombre_emp = db.Column(db.String(120), unique=False, nullable=False)
    numero_trab = db.Column(db.Integer, unique=False, nullable=False)
    ubicacion = db.Column(db.String(120), unique=False, nullable=False)
    tipo_trab = db.Column(db.Integer(120), ForeignKey('Tipo_Empleo.id'), unique=False, nullable=False)
    sede = db.Column(db.String(120), unique=False, nullable=False)
    telefono = db.Column(db.Integer, unique=False, nullable=False)
    sector = db.Column(db.Integer, ForeignKey('Sector.id'), unique=False, nullable=False)
    indentificacion_fiscal = db.Column(db.string(120), unique=False, nullable=False)
    descripcion = db.Column(db.string(120), unique=False, nullable=False)
    usuario = db.Column(db.Integer, ForeignKey('Usuario.id'), unique=False, nullable=False)

class Sector(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.string, unique=False, nullable=False)

class Me_Gusta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    candidato_id = db.Column(db.Integer, ForeignKey('Candidato.id'), unique=False, nullable=False)
    empresa_id = db.Column(db.Integer, ForeignKey('Empresa.id'), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }