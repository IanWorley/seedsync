import { Component, OnInit } from "@angular/core";

import { ROUTE_INFOS } from "../../routes";
import { StreamServiceRegistry } from "../../services/base/stream-service.registry";
import { ServerCommandService } from "../../services/server/server-command.service";
import { ConnectedService } from "../../services/utils/connected.service";
import { LoggerService } from "../../services/utils/logger.service";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.css"],
    standalone: false,
})
export class SidebarComponent implements OnInit {
    routeInfos = ROUTE_INFOS;

    public commandsEnabled: boolean;

    private _connectedService: ConnectedService;

    constructor(
        private _logger: LoggerService,
        _streamServiceRegistry: StreamServiceRegistry,
        private _commandService: ServerCommandService
    ) {
        this._connectedService = _streamServiceRegistry.connectedService;
        this.commandsEnabled = false;
    }

    // noinspection JSUnusedGlobalSymbols
    ngOnInit() {
        this._connectedService.connected.subscribe({
            next: (connected: boolean) => {
                this.commandsEnabled = connected;
            },
        });
    }

    onCommandRestart() {
        this._commandService.restart().subscribe({
            next: (reaction) => {
                if (reaction.success) {
                    this._logger.info(reaction.data);
                } else {
                    this._logger.error(reaction.errorMessage);
                }
            },
        });
    }
}
