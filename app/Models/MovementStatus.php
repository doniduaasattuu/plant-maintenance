<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovementStatus extends Model
{
    use HasFactory;

    protected $table = 'movement_status';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
}
