<?php

namespace App\Http\Controllers\api\staff;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCongeRequest;
use App\Http\Requests\StoreResquestConge;
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

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreResquestConge $request)
    {
        Conge::create([
            'from'=>$request->from,
            'to'=>$request->to,
            'status'=>0,
            'user_id'=>$request->user()->id,
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
        //
    }



}
