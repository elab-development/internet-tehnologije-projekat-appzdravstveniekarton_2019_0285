<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lekar extends Model
{
    use HasFactory;
    protected $fillable = [
        'ime', 'prezime', 'specijalizacija', 'adresa'
    ];

    public function dijagnoze()
    {
        return $this->hasMany(Dijagnoza::class);
    }
}
