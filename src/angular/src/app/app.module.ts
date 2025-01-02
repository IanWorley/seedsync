import {
    provideHttpClient,
    withInterceptorsFromDi,
} from "@angular/common/http";
import { NgModule, inject, provideAppInitializer } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy, RouterModule } from "@angular/router";

import { StorageServiceModule } from "ngx-webstorage-service";
import { environment } from "../environments/environment";
import { CachedReuseStrategy } from "./common/cached-reuse-strategy";
import { CapitalizePipe } from "./common/capitalize.pipe";
import { ClickStopPropagationDirective } from "./common/click-stop-propagation.directive";
import { EtaPipe } from "./common/eta.pipe";
import { FileSizePipe } from "./common/file-size.pipe";
import { AboutPageComponent } from "./pages/about/about-page.component";
import { AutoQueuePageComponent } from "./pages/autoqueue/autoqueue-page.component";
import { FileListComponent } from "./pages/files/file-list.component";
import { FileOptionsComponent } from "./pages/files/file-options.component";
import { FileComponent } from "./pages/files/file.component";
import { FilesPageComponent } from "./pages/files/files-page.component";
import { LogsPageComponent } from "./pages/logs/logs-page.component";
import { AppComponent } from "./pages/main/app.component";
import { HeaderComponent } from "./pages/main/header.component";
import { SidebarComponent } from "./pages/main/sidebar.component";
import { OptionComponent } from "./pages/settings/option.component";
import { SettingsPageComponent } from "./pages/settings/settings-page.component";
import { AutoQueueServiceProvider } from "./services/autoqueue/autoqueue.service";
import {
    StreamDispatchService,
    StreamServiceRegistryProvider,
} from "./services/base/stream-service.registry";
import { ModelFileService } from "./services/files/model-file.service";
import { ViewFileFilterService } from "./services/files/view-file-filter.service";
import { ViewFileOptionsService } from "./services/files/view-file-options.service";
import { ViewFileSortService } from "./services/files/view-file-sort.service";
import { ViewFileService } from "./services/files/view-file.service";
import { LogService } from "./services/logs/log.service";
import { ServerCommandServiceProvider } from "./services/server/server-command.service";
import { ServerStatusService } from "./services/server/server-status.service";
import { ConfigServiceProvider } from "./services/settings/config.service";
import { ConnectedService } from "./services/utils/connected.service";
import { DomService } from "./services/utils/dom.service";
import { LoggerService } from "./services/utils/logger.service";
import { NotificationService } from "./services/utils/notification.service";
import { RestService } from "./services/utils/rest.service";
import { VersionCheckService } from "./services/utils/version-check.service";

@NgModule({
    declarations: [
        FileSizePipe,
        EtaPipe,
        CapitalizePipe,
        ClickStopPropagationDirective,
        AppComponent,
        FileListComponent,
        FileComponent,
        FileOptionsComponent,
        FilesPageComponent,
        HeaderComponent,
        SidebarComponent,
        SettingsPageComponent,
        OptionComponent,
        AutoQueuePageComponent,
        LogsPageComponent,
        AboutPageComponent,
    ],
    bootstrap: [AppComponent],
    imports: [BrowserModule, FormsModule, StorageServiceModule, RouterModule],
    providers: [
        { provide: RouteReuseStrategy, useClass: CachedReuseStrategy },
        LoggerService,
        NotificationService,
        RestService,
        ViewFileService,
        ViewFileFilterService,
        ViewFileSortService,
        ViewFileOptionsService,
        DomService,
        VersionCheckService,
        // Stream services
        StreamDispatchService,
        StreamServiceRegistryProvider,
        ServerStatusService,
        ModelFileService,
        ConnectedService,
        LogService,
        AutoQueueServiceProvider,
        ConfigServiceProvider,
        ServerCommandServiceProvider,
        // Initialize services not tied to any components
        provideAppInitializer(() => {
            const initializerFn = dummyFactory(inject(ViewFileFilterService));
            return initializerFn();
        }),
        provideAppInitializer(() => {
            const initializerFn = dummyFactory(inject(ViewFileSortService));
            return initializerFn();
        }),
        provideAppInitializer(() => {
            const initializerFn = dummyFactory(inject(VersionCheckService));
            return initializerFn();
        }),
        provideHttpClient(withInterceptorsFromDi()),
    ],
})
export class AppModule {
    constructor(private logger: LoggerService) {
        this.logger.level = environment.logger.level;
    }
}

// noinspection JSUnusedLocalSymbols
export function dummyFactory(s) {
    return () => null;
}
