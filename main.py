import psutil
import time
from colorama import Fore, Style, init

# Inicializar colorama para soporte de caracteres y colores en terminal
init(autoreset=True)

def monitor_system():
    print(Fore.CYAN + "=== Docker System Monitor ===")
    try:
        while True:
            cpu_usage = psutil.cpu_percent(interval=1)
            ram_usage = psutil.virtual_memory().percent
            
            # Determinar color basado en la carga
            cpu_color = Fore.RED if cpu_usage > 80 else Fore.GREEN
            ram_color = Fore.RED if ram_usage > 80 else Fore.GREEN

            print(f"{Fore.YELLOW}CPU:{cpu_color} {cpu_usage}% {Style.RESET_ALL} | "
                  f"{Fore.YELLOW}RAM:{ram_color} {ram_usage}%")
            
            time.sleep(2)
    except KeyboardInterrupt:
        print(Fore.MAGENTA + "\nMonitor detenido por el usuario.")

if __name__ == "__main__":
    monitor_system()