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
    candidato = db.Column(db.Boolean(), unique=False, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "candidato": self.candidato,
        }

class Tipo_Empleo(db.Model):
    __tablename__ = "Tipo_Empleo"

    id = db.Column(db.Integer, primary_key=True)
    NEmpleo = db.Column(db.String(120), unique=False, nullable=False)

    def serialize(self):
        return{
            "id": self.id,
            "NEmpleo": self.label
        }

class Provincia(db.Model):
    __tablename__ = "Provincia"

    id = db.Column(db.Integer, primary_key=True)
    Nprovincia = db.Column(db.String(120), unique=False, nullable=False)
    def serialize(self):
        return{
            "id": self.id,
            "Nprovincia": self.label
        }

class Candidato(db.Model):
    __tablename__ = "Candidato"

    id = db.Column(db.Integer, primary_key=True)
    avatar = db.Column(db.String(120), unique=False, nullable=False)
    nombre = db.Column(db.String(120), unique=False, nullable=False)
    primer_apellido = db.Column(db.String(120), unique=False, nullable=False)
    segundo_apellido = db.Column(db.String(120), unique=False, nullable=False)
    puesto_trab = db.Column(db.String(120), unique=False, nullable=False)
    telefono = db.Column(db.Integer, unique=False, nullable=True)
    experiencia = db.Column(db.String(120), unique=False, nullable=False)
    cv = db.Column(db.String(120), unique=False, nullable=True)
    carta_presen = db.Column(db.String(120), unique=False, nullable=True)
    tipo_emp = db.Column(db.Integer, db.ForeignKey('Tipo_Empleo.id'), unique=False, nullable=False)
    empleos = db.relationship(Tipo_Empleo)
    provincia = db.Column(db.Integer, db.ForeignKey('Provincia.id'), unique=False, nullable=False)
    provincias = db.relationship(Provincia)
    usuario_id = db.Column(db.Integer, db.ForeignKey('Usuario.id'), unique=False, nullable=False)
    usuarios = db.relationship(Usuario)
    es_visible = db.Column(db.Boolean(), unique=False, nullable=False)

    def serialize(self):
        return{
            "id": self.id,
            "avatar": self.avatar,
            "nombre": self.nombre,
            "primer_apellido": self.primer_apellido,
            "segundo_apellido": self.segundo_apellido,
            "puesto_trab": self.puesto_trab,
            "telefono": self.telefono,
            "experiencia": self.experiencia,
            "cv": self.cv,
            "carta_presen": self.carta_presen,
            "tipo_emp": self.tipo_emp,
            "provincia": self.provincia,
            "usuario_id": self.usuario_id
        }

class Sector(db.Model):
    __tablename__ = "Sector"

    id = db.Column(db.Integer, primary_key=True)
    Nsector = db.Column(db.String(120), unique=False, nullable=False)
    def serialize(self):
        return{
            "id": self.id,
            "Nsector": self.label
        }

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
    usuario_id = db.Column(db.Integer, db.ForeignKey('Usuario.id'), unique=False, nullable=False)
    # Es_empresa = db.Column(db.Integer, db.ForeignKey('Usuario.id'), unique=False, nullable=False)
    usuarios = db.relationship(Usuario)

    def serialize(self):
        return{
            "id": self.id,
            "avatar": self.avatar,
            "nombre_emp": self.nombre_emp,
            "numero_trab": self.numero_trab,
            "ubicacion": self.ubicacion,
            "tipo_trab": self.tipo_trab,
            "sede": self.sede,
            "telefono": self.telefono,
            "sector": self.sector,
            "identificacion_fiscal": self.identificacion_fiscal,
            "descripcion": self.descripcion,
            "usuario_id": self.usuario_id
        }


class Me_Gusta(db.Model):
    __tablename__ = "Me_gusta"

    id = db.Column(db.Integer, primary_key=True)
    candidato_id = db.Column(db.Integer, db.ForeignKey('Candidato.id'), unique=False, nullable=False)
    candidatos = db.relationship(Candidato)
    empresa_id = db.Column(db.Integer, db.ForeignKey('Empresa.id'), unique=False, nullable=False)
    empresas = db.relationship(Empresa)

    def serialize(self):
        return{
            "id": self.id,
            "candidato_id": self.candidato_id,
            "empresa_id": self.empresa_id,
        }