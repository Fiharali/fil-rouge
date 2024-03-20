<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Campus;
use App\Models\City;
use App\Models\ClassName;
use App\Models\Level;
use App\Models\Promotion;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {



        return response([
            'users' => UserResource::collection(User::all()),
            'cities' => City::all(),
            'campuses' => Campus::all(),
            'promotions' => Promotion::all(),
            'levels' => Level::all(),
            'class_names' => ClassName::all(),
            'roles' => Role::all(),
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $user=User::create($request->all());

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $user->addMedia($file)->toMediaCollection('images');
        }

         $user->roles()->attach($request->role);
        return response([
            'success' => 'User added Successful',
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response([
            'success' => 'User added Successful',
        ]);
    }




}


