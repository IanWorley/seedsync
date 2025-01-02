import {Injectable} from "@angular/core";
import {Observable, BehaviorSubject} from "rxjs";

import {Localization} from "../../common/localization";
import {ServerStatus, ServerStatusJson} from "./server-status";
import {BaseStreamService} from "../base/base-stream.service";


@Injectable()
export class ServerStatusService extends BaseStreamService {

    private _status: BehaviorSubject<ServerStatus> =
        new BehaviorSubject(new ServerStatus({
            server: {
                up: false,
                errorMessage: Localization.Notification.STATUS_CONNECTION_WAITING
            }
        }));

    constructor() {
        super();
        this.registerEventName("status");
    }

    get status(): Observable<ServerStatus> {
        return this._status.asObservable();
    }

    protected onEvent(eventName: string, data: string) {
        this.parseStatus(data);
    }

    protected onConnected() {
        // nothing to do
    }

    protected onDisconnected() {
        // Notify the clients
        this._status.next(new ServerStatus({
            server: {
                up: false,
                errorMessage: Localization.Error.SERVER_DISCONNECTED
            }
        }));
    }

    /**
     * Parse an event and notify subscribers
     * @param {string} data
     */
    private parseStatus(data: string) {
        const statusJson: ServerStatusJson = JSON.parse(data);
        const status = ServerStatus.fromJson(statusJson);
        this._status.next(status);
    }
}
