export default class ApiRouteResolver{

    static secureProtocol = 'https://';

    static protocol = 'http://';

    static apiBase = 'localhost';
    static port = '5155';
    static securePort = '7117';

    static baseUrl = this.apiBase + ':' + this.port;

    static buildApiUrl = (controller, endpoint) => {
        return [ApiRouteResolver.protocol + ApiRouteResolver.baseUrl, controller, endpoint].join('/').trimEnd("/");
    }



}