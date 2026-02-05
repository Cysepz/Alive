package com.cysepz.alive;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AliveApplication {

	public static void main(String[] args) {
		System.out.println(">>> Backend activating...");
		try {
			SpringApplication.run(AliveApplication.class, args);
			System.out.println(">>> Backend is now ONLINE!");
		} catch (Exception e) {
			// 關鍵：過濾掉 DevTools 的安靜退出異常
			if (!e.getClass().getName().contains("SilentExitException")) {
				System.err.println(">>> Backend FAILED to start!");
				e.printStackTrace();
			}
		}
	}

}
