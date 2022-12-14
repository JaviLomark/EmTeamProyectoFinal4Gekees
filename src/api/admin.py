  
import os
from flask_admin import Admin
from .models import db, User
from .models import db, Usuario
from .models import db, Tipo_Empleo
from .models import db, Provincia
from .models import db, Candidato
from .models import db, Sector
from .models import db, Empresa
from .models import db, Me_Gusta
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='EmpTalent', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    # admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Usuario, db.session))
    admin.add_view(ModelView(Tipo_Empleo, db.session))
    admin.add_view(ModelView(Provincia, db.session))
    admin.add_view(ModelView(Candidato, db.session))
    admin.add_view(ModelView(Sector, db.session))
    admin.add_view(ModelView(Empresa, db.session))
    admin.add_view(ModelView(Me_Gusta, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))