<?php

namespace App\Http\Repositories;

use App\Models\Level;

class LevelRepository
{
    public function all()
    {
        return Level::all();
    }

    public function create(array $data)
    {
        return Level::create($data);
    }

    public function delete(Level $level): ?bool
    {
        return $level->delete();
    }
}
