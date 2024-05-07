class TicketUI{
  constructor(tickets){
    this.tickets = tickets;
    this.container = document.querySelector('#ticketsContainer')
  }
  renderTicket(){
  }
  clearContainer(){
    this.container.innerHTML = '';
    }
  showEmptyMessage(){
    templateMessage()
    }
  static templateTicket(){
      return `<div class="tickets-sections">
      <div class="container">
          <div class="col s12 m6">
            <div class="card ticket-card">
              <div class="ticket-airline d-flex align-items-center">
                <img
                  src="${this.tickets.logo}"
                  class="ticket-airline-img"
                />
                <span class="ticket-airline-name"
                  >${this.tickets.airlineName}</span
                >
              </div>
              <div class="ticket-destination d-flex align-items-center">
                <div class="d-flex align-items-center mr-auto">
                  <span class="ticket-city">${this.tickets.origin_name}</span>
                  <i class="medium material-icons">flight_takeoff</i>
                </div>
                <div class="d-flex align-items-center">
                  <i class="medium material-icons">flight_land</i>
                  <span class="ticket-city">${this.tickets.destination_name}</span>
                </div>
              </div>
              <div class="ticket-time-price d-flex align-items-center">
                <span class="ticket-time-departure">${this.tickets.departureTime}</span>
                <span class="ticket-price ml-auto">$${this.tickets.price}</span>
              </div>
              <div class="ticket-additional-info">
                <span class="ticket-transfers">Пересадок: ${this.tickets.transfers}</span>
                <span class="ticket-flight-number">Номер рейса: ${this.tickets.flight_number  }</span>
              </div>
            </div>
          </div>
        </div>
      </div>
              </div>`
    }
  static templateMessage(){
    return ` <div class="tickets-empty-res-msg">
    По вашему запросу билетов не найдено.
  </div>`
}
}
const ticketUI = new TicketUI;
export default ticketUI;