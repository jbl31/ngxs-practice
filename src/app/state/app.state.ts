import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { DeleteUsers, GetUsers, UpdateUsers } from "../actions/app.action";
import { tap } from 'rxjs/operators';
import { DesignUtilityService } from "../design-utility.service";

export class UserStateModel {
    users: any;
}

@State<UserStateModel>({
    name: 'appstate',
    defaults: {
        users: []
    }
})

@Injectable()
export class AppState {
    constructor(private _du: DesignUtilityService){}

    @Selector()
    static selectStateData(state:UserStateModel){
        return state.users;
    }

    // TODO: Switch deprecated tap expression to Observables
    @Action(GetUsers)
    getDatafromState(ctx: StateContext<UserStateModel>) {
        return this._du.fetchUsers().pipe(tap(returnData => {
            const state = ctx.getState();
            ctx.patchState({
                users:[...state.users,returnData]
            })
        }))
    }

    @Action(UpdateUsers)
    updateDataOfState(ctx: StateContext<UserStateModel>, { payload, id, i }: UpdateUsers){
        return this._du.updateUser(payload, i).pipe(tap(returnData => {
            const state = ctx.getState();

            const userList = [...state.users];
            userList[i]=payload;

            ctx.setState({
                ...state,
                users: userList,
            });
        }))
    }

    @Action(DeleteUsers)
    deleteDataFromState(ctx: StateContext<UserStateModel>, {id}: DeleteUsers) {
        return this._du.deleteUser(id).pipe(tap (returnData => {
            const state = ctx.getState();
            console.log("The id is:", id);
            const filteredArray = state.users.filter((contents: { id: number; }) => contents.id !== id);

            ctx.setState({
                ...state,
                users:filteredArray
            })
        }))
    }
}