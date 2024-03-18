<?php

namespace App\Http\Controllers\api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{





    public function  Login(Request $request){

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(
                [
                    'error'=>'these credentials do not match our records .',
                ], Response::HTTP_UNAUTHORIZED);
        }
         $user=Auth::user();
        $token=$user->createToken('usertoken')->plainTextToken;
        $roles = $user->roles()->pluck('name');
        $response=[
            'user'=>$user,
            'token'=>$token,
            'roles' => $roles,
        ];
        return response($response);
    }

    public function  Register(Request $request){


        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);
    }
}
