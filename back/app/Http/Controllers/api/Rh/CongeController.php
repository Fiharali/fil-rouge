<?php

namespace App\Http\Controllers\api\Rh;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCongeRequest;
use App\Http\Resources\CongeResource;
use App\Http\Resources\UserResource;
use App\Models\Absence;
use App\Models\Conge;
use App\Models\User;
use Illuminate\Http\Request;

class CongeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $conges=Conge::all();
        return response([
            'conges'=>CongeResource::collection($conges)
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCongeRequest $request)
    {
        Conge::create([
            'from'=>$request->from,
            'to'=>$request->to,
            'status'=>$request->status,
            'user_id'=>$request->user,
        ]);

        return response([
            'success' => 'add new conge Successful',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Conge $conge)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Conge $conge)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Conge $conge)
    {
        $conge->delete();
        return response([
            'success' => 'Conge deleted  Successful',
        ]);
    }


    public function usersForConge(){

        $users=User::whereHas('roles', function ($query) {
            $query->where('name', 'staff');
        })->get();

        return response([
            'users' => UserResource::collection($users),
        ]);
    }
}
