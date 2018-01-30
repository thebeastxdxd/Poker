import base64
from PIL import Image

def dump_datetime(value):
    """Deserialize datetime object into string form for JSON processing."""
    if value is None:
        return None
    return [value.strftime("%Y-%m-%d"), value.strftime("%H:%M:%S")]



def username_to_base64_avatar(userName):

    filename = 'avatars/{0}_avatar.jpg'.format(userName) 
    
    with open(filename, 'rb') as f:
        imgdata = f.read()
        img_base64 = base64.encodebytes(imgdata)

    return img_base64

def path_to_base64_avatar(filename):

    with open(filename, 'rb') as f:
        imgdata = f.read()
        img_base64 = base64.encodebytes(imgdata)
    
    return img_base64

def resize_image(filename):
    
    img = Image.open(filename)
    img.thumbnail((200, 200), Image.ANTIALIAS)
    img.save(filename, 'JPEG')

    print(filename, ' resized')

