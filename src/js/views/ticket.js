class TicketUI{
  constructor(){
    this.container = document.querySelector('#ticketsContainer .row')
  }
  renderTicket(tickets){
    if (!tickets.length) {
        this.showEmptyMessage();
        return;
    }
    
    let fragment = '';
    tickets.forEach(element => {
        const card = TicketUI.templateTicket(element);
        fragment += card;
    });

    this.container.insertAdjacentHTML('beforeend', fragment);

  }
  clearContainer(){
    this.container.innerHTML = '';
    }
  showEmptyMessage(){
    const message = TicketUI.templateMessage();
    this.container.insertAdjacentHTML('afterbegin', message);
}
  static templateTicket(tickets){
      return `<div class="col s12 m6">
            <div class="card ticket-card">
              <div class="ticket-airline d-flex align-items-center">
                <img
                  src="${tickets.logo}"
                  class="ticket-airline-img"
                />
                <span class="ticket-airline-name"
                  >${tickets.airlineName}</span
                >
              </div>
              <div class="ticket-destination d-flex align-items-center">
                <div class="d-flex align-items-center mr-auto">
                  <span class="ticket-city">${tickets.origin_name}</span>
                  <i class="medium material-icons">flight_takeoff</i>
                </div>
                <div class="d-flex align-items-center">
                  <i class="medium material-icons">flight_land</i>
                  <span class="ticket-city">${tickets.destination_name}</span>
                </div>
              </div>
              <div class="ticket-time-price d-flex align-items-center">
                <span class="ticket-time-departure">${tickets.departureTime}</span>
                <span class="ticket-price ml-auto">$${tickets.price}</span>
              </div>
              <div class="ticket-additional-info">
                <span class="ticket-transfers">Пересадок: ${tickets.transfers}</span>
                <span class="ticket-flight-number">Номер рейса: ${tickets.flight_number  }</span>
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
const ticketUI = new TicketUI();
export default ticketUI;