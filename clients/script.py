import os
import shutil

# Define the path to the downloads directory
downloads_path = 'C:\\Users\\44743\\Desktop\\fyp-2\\clients'
upload_path = 'C:\\Users\\44743\\Desktop\\fyp-2\\clients'

# Loop through all files in the downloads directory
for file_name in os.listdir(downloads_path):
    if file_name.endswith('.pdf'):
        # Extract the name from the file name
        fname = file_name.split(" ")
        first_name = fname[1].strip()
        last_name = fname[0].strip()
        name = last_name + ' ' +first_name
        if not os.path.exists(os.path.join(upload_path, name)):
            os.mkdir(os.path.join(upload_path, name))
        # Move the file to the appropriate subdirectory
        shutil.move(os.path.join(downloads_path, file_name), os.path.join(upload_path, name, file_name))
        





