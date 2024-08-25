import os
import pandas as pd
import firebase_admin

from firebase_admin import credentials, db

cred = credentials.Certificate('./gyanvesh.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://gyanvesh-9930d-default-rtdb.asia-southeast1.firebasedatabase.app/'
})
def excel_to_dict(file_path: str) -> dict:
    # Get the file name without extension
    file_name = os.path.splitext(os.path.basename(file_path))[0]
    
    # Read the Excel file into a pandas DataFrame
    df = pd.read_excel(file_path)
    
    # Convert the DataFrame to a dictionary (orient by records)
    data_dict = df.to_dict(orient='records')
    
    # Create the final dictionary with the file name as the key
    result = {file_name: data_dict}
    
    return result

# Example usage:
file_path = "June.xlsx"  
file_name = os.path.splitext(os.path.basename(file_path))[0]
data = excel_to_dict(file_path)
ref = db.reference(f'/Districts/Meerut/Mawana/')

# Upload data to Realtime Database
ref.update(data)
# Print the result
print(data)
