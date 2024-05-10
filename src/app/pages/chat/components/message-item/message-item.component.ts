import { Component, Input } from '@angular/core';
import { TiempoEnMilisegundos } from '../../../../enums/tiempo-en-milisegundos';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent {
  @Input() public texto: string = "";
  @Input() public nombre: string = "";
  @Input() public esPropio: boolean = false;
  @Input() public fecha!: Date;

  formatearFecha() {
    const fechaActual = new Date();
    const f = new Date();
    const dif = fechaActual.getTime() - this.fecha.getTime();
    TiempoEnMilisegundos.Dia;
    if (dif > TiempoEnMilisegundos.Dia) {
      return this.fecha.toLocaleDateString('es-ES', {hour: '2-digit', minute:'2-digit'});
      
    } else if (dif > TiempoEnMilisegundos.Hora) {//si es menor a un dia y mayor a una hora mostrar solamente la hora
      return this.fecha.getHours().toString().padStart(2,'0')+ ':'+this.fecha.getMinutes().toString().padStart(2,'0');
      
    } else if (dif > TiempoEnMilisegundos.Minuto) {
      const minutos = (dif / TiempoEnMilisegundos.Minuto).toFixed(0);
      return 'Hace ' + minutos + (minutos === '1' ? ' minuto' : ' minutos');
      
    }
    return 'Hace instantes';
  }
}
