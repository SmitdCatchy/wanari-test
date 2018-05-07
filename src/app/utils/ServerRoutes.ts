export class Routes {
  static STATES_GET_ALL: String = 'states/all';
}

export class Server {
  private static address: String = 'opensky-network.org';
  private static prefix: String = 'api';

  static routeTo(route: String) {
    return `https://${Server.address}/${Server.prefix}/${route}`
  }
}
