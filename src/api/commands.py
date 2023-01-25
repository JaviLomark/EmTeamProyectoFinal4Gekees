
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
        tipos = ['remoto', 'hibrido', 'presencial']
        for name in tipos:
            tipo_emple = Tipo_Empleo(NEmpleo=name)
            db.session.add(tipo_emple)
            db.session.commit()

        print("All test Tipo_Empleo created")

        ### Insert the code to populate others tables if needed
