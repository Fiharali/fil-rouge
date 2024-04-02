<?php

namespace App\Http\Controllers\api\apprenant;

use App\Http\Controllers\Controller;
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $absence=Absence::create($request->all());

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $absence->addMedia($file)->toMediaCollection('absences');
        }
        return response([
            'success' => 'User absence Successful',
        ]);
    }



}
