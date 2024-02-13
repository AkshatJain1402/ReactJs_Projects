import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate(r'C:\Users\aksha\React.js\noteapp\src\notemakingapp-56cd7-firebase-adminsdk-sbhok-65db79fe40.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://notemakingapp-56cd7-default-rtdb.firebaseio.com/'

})


ref = db.reference('/python/data')

data={'key1': 'value1',
    'key2': 'value2'}
data={'key1': 'value1',
    'key2': 'value2'}
def sendData(data):
    ref.set(data)
def updateData(data2):
    ref.update({"key3": data2})
sendData(data)
updateData(data)

    
