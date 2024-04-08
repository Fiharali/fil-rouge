<?php

namespace App\Http\Controllers\api\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangeStatusAbsenceRequest;
use App\Http\Requests\StoreNewAbsenceRequest;
use App\Http\Resources\AbsenceResource;
use App\Models\Absence;
use App\Models\Type;
use Illuminate\Http\Request;

class AbsenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $absences=Absence::with('user')->get();
        return response([
            'absences' => AbsenceResource::collection($absences),
            ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNewAbsenceRequest $request)
    {
        $absence=Absence::create([
            'date'=>$request->date,
            'type_id'=>$request->type,
            'status'=>0,
            'user_id'=>$request->user,
        ]);

        return response([
            'success' => 'add Absence Successful',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Absence $absence)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Absence $absence)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Absence $absence)
    {
        //
    }


    public function  myAbsences(Request $request): \Illuminate\Foundation\Application|\Illuminate\Http\Response|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory
    {
        $absences=Absence::where('user_id',$request->user()->id)->get();
        return response([
            'absences' => AbsenceResource::collection($absences),
        ]);
    }

    public function allTypes()
    {
        return Type::all();
    }

     public function changeStatus(ChangeStatusAbsenceRequest $request ,Absence $absence)
    {
        $absence->status=$request->status;
        return response([
            'success' => 'User absence Successful',
        ]);
    }
}
