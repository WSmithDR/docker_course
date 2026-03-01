import requests
import time
from datetime import datetime
from colorama import Fore, Style, init
from box import ConfigBox # Para manejar diccionarios de forma elegante

# Inicializar colorama
init(autoreset=True)

# Configuración usando ConfigBox (Pure Python)
config = ConfigBox({
    "url": "https://www.google.com",
    "interval": 5,
    "timeout": 2
})

def check_health():
    print(Fore.CYAN + f"=== Monitoring: {config.url} ===")
    
    try:
        while True:
            now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            start_time = time.time()
            
            response = requests.get(config.url, timeout=config.timeout)
            duration = round((time.time() - start_time) * 1000, 2)
            
            status_color = Fore.GREEN if response.status_code == 200 else Fore.RED
            
            print(f"[{now}] Status: {status_color}{response.status_code}{Style.RESET_ALL} | "
                  f"Latency: {Fore.YELLOW}{duration}ms")
            
            time.sleep(config.interval)
            
    except KeyboardInterrupt:
        print(Fore.MAGENTA + "\nMonitor finalizado por el usuario.")

if __name__ == "__main__":
    check_health()