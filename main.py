import os
import time
from colorama import Fore, Style, init

# Inicializar colores para la terminal
init(autoreset=True)

def start_service():
    # Recuperar variables de entorno
    db_user = os.getenv("DB_USER")
    db_pass = os.getenv("DB_PASSWORD")
    app_env = os.getenv("APP_ENV", "development") # Valor por defecto

    print(Fore.CYAN + f"=== Starting Service in {app_env.upper()} mode ===")

    if not db_user or not db_pass:
        print(Fore.RED + " [ERROR] Missing environment variables: DB_USER or DB_PASSWORD")
        return

    print(Fore.GREEN + f" [SUCCESS] Authenticated as: {db_user}")
    
    try:
        while True:
            print(f"[{time.strftime('%H:%M:%S')}] Service is running and connected to DB...")
            time.sleep(10)
    except KeyboardInterrupt:
        print(Fore.YELLOW + "\nService stopped.")

if __name__ == "__main__":
    start_service()