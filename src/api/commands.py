
import click
from api.models import db, User, Tipo_Empleo, Provincia, Sector, PuestoTrabajo

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_data(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")


    """ 
    This is an example command "insert_tipo_empleo" that you can run from the command line
    by typing: $ flask insert_tipo_empleo
    """
    @app.cli.command("insert_tipo_empleo") # name of our command
    def insert_tipo_empleo():
        print("Creating test Tipo_Empleo")
        tipos = ['Remoto', 'Hibrido', 'Presencial']
        for name in tipos:
            tipo_emple = Tipo_Empleo(NEmpleo=name)
            db.session.add(tipo_emple)
            db.session.commit()

        print("All test Tipo_Empleo created")

        ### Insert the code to populate others tables if needed


    """ 
    This is an example command "insert_provincia" that you can run from the command line
    by typing: $ flask insert_provincia
    """
    @app.cli.command("insert_provincia") # name of our command
    def insert_provincia():
        print("Creating test Provincia")
        nombres = ['Alicante', 'Albacete', 'Almería', 'Álava', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona', 'Coruña', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ceuta', 'Ciudad Real', 'Córdoba', 'Cuenca', 'Guipúzcoa', 'Gerona', 'Granada', 'Guadalajara', 'Huelva', 'Huesca', 'Islas Baleares', 'Jaén', 'La Rioja', 'Las Palmas', 'León', 'Lleida', 'Lugo', 'Madrid', 'Málaga', 'Melilla', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Pontevedra', 'Salamanca', 'Santa Cruz de Tenerife', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza']
        for name in nombres:
            provincia = Provincia(Nprovincia=name)
            db.session.add(provincia)
            db.session.commit()

        print("All test Provincia created")


    """ 
    This is an example command "insert_sector" that you can run from the command line
    by typing: $ flask insert_sector
    """
    @app.cli.command("insert_sector") # name of our command
    def insert_sector():
        print("Creating test Sector")
        tipos = ['Actividades deportivas', 'Administración y gestión', 'Agraria', 'Artes gráficas', 'Artes y artesanías', 'Comercio y marketing', 'Edificación y obra civil', 'Electricidad y electrónica', 'Energía y agua', 'Fabricación mecánica', 'Hostelería y turismo', 'Imagen personal', 'Imagen y sonido', 'Industrias alimentarias', 'Industrias extractivas', 'Informática y comunicaciones', 'Instalación y mantenimiento', 'Madera, mueble y corcho', 'Marítimo pesquera', 'Química', 'Sanidad', 'Seguridad y medio ambiente', 'Servicios socioculturales y a la comunidad', 'Textil, confección y piel', 'Transporte', 'Mantenimiento de vehículos', 'Vidrio y cerámica']
        for name in tipos:
            sector = Sector(Nsector=name)
            db.session.add(sector)
            db.session.commit()

        print("All test Sector created")

    """ 
    This is an example command "insert_puesto_trabajo" that you can run from the command line
    by typing: $ flask insert_puesto_trabajo
    """
    @app.cli.command("insert_puesto_trabajo") # name of our command
    def insert_puesto_trabajo():
        print("Creating test PuestoTrabajo")
        tipos = ['Diseñador web', 'Desarrollador .NET', 'Desarrollador Android', 'Desarrollador Backend', 'Desarrollador Blockchain',  'Desarrollador APP', 'Desarrollador Front End', 'Desarrollador Full Stack', 'Desarrollador Low Code', 'Desarrollador NodeJS', 'Programador C++', 'Programador C#', 'Programador Cobol', 'Programador Delphi', 'Programador Bases de Datos', 'Programador Java', 'Programador PHP', 'Programador Python', 'Programador Rust', 'Programador SQL', 'Programador Unity']
        for name in tipos:
            puesto_trabajo = PuestoTrabajo(NTrabajo=name)
            db.session.add(puesto_trabajo)
            db.session.commit()

        print("All test PuestoTrabajo created")

        ### Insert the code to populate others tables if needed

