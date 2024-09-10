<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MotorCheckRecord extends Model
{
    use HasFactory;

    protected $table = 'motor_check_records';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $inrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'id',
        'equipment_id',
        'operational_status_id',
        'cleanliness_id',
        'number_of_greasing',
        'temperature_de',
        'temperature_body',
        'temperature_nde',
        'vibration_dev',
        'vibration_deh',
        'vibration_dea',
        'vibration_def',
        'noise_de',
        'vibration_ndev',
        'vibration_ndeh',
        'vibration_ndef',
        'noise_nde',
        'created_at',
        'updated_at',
        'checked_by',
    ];
}
