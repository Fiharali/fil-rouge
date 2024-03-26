<?php

namespace App\Http\Controllers\api\user;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Campus;
use App\Models\City;
use App\Models\ClassName;
use App\Models\Level;
use App\Models\Promotion;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;

class ProfileUserController extends Controller
{
    //


    public function index(){
        return response([
            'user' => new UserResource(User::find(20)),
            'cities' => City::all(),
            'campuses' => Campus::all(),
            'promotions' => Promotion::all(),
            'levels' => Level::all(),
            'class_names' => ClassName::all(),
            'roles' => Role::all(),
        ]);
    }


    public function update(Request $request ){
        //$user=Auth::user();
        $user=User::find(20);
        $user->update($request->all());
        if ($request->hasFile('image')) {
            $user->clearMediaCollection('images');
            $user->addMediaFromRequest('image')->toMediaCollection('images');
        }

        //return $user;
       return response([
            'success' => 'User updated Successful',

       ]);
    }
}
