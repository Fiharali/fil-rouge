<?php

namespace App\Http\Controllers\api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
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

        return response([
            'user'=>new UserResource($user),
            'token'=>$token,
        ]);
    }

    public function  Register(Request $request){


        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);
    }
}
