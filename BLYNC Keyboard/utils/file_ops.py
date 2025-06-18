import os
import datetime

def save_text_to_file(text, folder):
    try:
        if not os.path.exists(folder):
            os.makedirs(folder)
        timestamp = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
        filename = f"output_{timestamp}.txt"
        filepath = os.path.join(folder, filename)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(text)
        return True
    except Exception as e:
        print(f"Error saving file: {e}")
        return False
